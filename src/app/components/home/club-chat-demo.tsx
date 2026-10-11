"use client";

import { FormEvent, useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import { demoMessageSchema } from "@/src/lib/validation";

type Message = {
  id: string;
  author: string;
  message: string;
  created_at: string;
  isLocal?: boolean;
};

const fallbackMessages: Message[] = [
  {
    id: "demo-1",
    author: "Nora",
    message: "Er der nogen, der vil dele dagens vigtigste opgave? Min er at få sendt mit tilbud afsted.",
    created_at: "2026-10-11T09:12:00+02:00",
  },
  {
    id: "demo-2",
    author: "Maja",
    message: "Ja! Jeg gør min portfolio færdig i dag. Skal vi tjekke ind igen kl. 14?",
    created_at: "2026-10-11T09:18:00+02:00",
  },
];

function initials(name: string) {
  return name.trim().slice(0, 2).toUpperCase() || "KF";
}

function timeLabel(value: string) {
  return new Intl.DateTimeFormat("da-DK", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ClubChatDemo() {
  const [messages, setMessages] = useState<Message[]>(fallbackMessages);
  const [author, setAuthor] = useState("Kreativ gæst");
  const [draft, setDraft] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    async function loadMessages() {
      const { data, error } = await supabase
        .from("demo_messages")
        .select("id, author, message, created_at")
        .order("created_at", { ascending: true })
        .limit(40);

      if (!active || error) return;
      setMessages(data);
      setIsLive(true);
    }

    void loadMessages();

    const channel = supabase
      .channel("public-demo-chat")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "demo_messages" },
        (payload) => {
          const incoming = payload.new as Message;
          setMessages((current) =>
            current.some((item) => item.id === incoming.id)
              ? current
              : [...current, incoming].slice(-40),
          );
        },
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = demoMessageSchema.safeParse({ author, message: draft });

    if (!result.success || isSending) return;
    const { author: cleanAuthor, message: cleanMessage } = result.data;
    setIsSending(true);

    if (isLive) {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("demo_messages")
        .insert({ author: cleanAuthor, message: cleanMessage })
        .select("id, author, message, created_at")
        .single();

      if (!error && data) {
        setMessages((current) =>
          current.some((item) => item.id === data.id)
            ? current
            : [...current, data].slice(-40),
        );
        setDraft("");
        setIsSending(false);
        return;
      }
    }

    setMessages((current) => [
      ...current,
      {
        id: `local-${Date.now()}`,
        author: cleanAuthor,
        message: cleanMessage,
        created_at: new Date().toISOString(),
        isLocal: true,
      },
    ]);
    setDraft("");
    setIsSending(false);
  }

  return (
    <section id="chatdemo" className="border-y border-[var(--ink)]/15 bg-[var(--paper)] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow">Prøv fællesskabet</p>
          <h2 className="font-display mt-7 text-[clamp(3.2rem,5.5vw,6rem)] leading-[0.9] tracking-[-0.055em]">
            Skriv noget ufærdigt.
          </h2>
          <p className="mt-7 max-w-md text-lg leading-8 text-[var(--muted)]">
            En åben chatdemo med fiktive beskeder. Når Supabase-tabellen er oprettet, gemmes beskederne og dukker op live.
          </p>
          <div className="mt-7 flex items-center gap-3 text-sm font-bold">
            <span className={`size-3 rounded-full ${isLive ? "bg-emerald-500" : "bg-[var(--pink)]"}`} aria-hidden="true" />
            {isLive ? "Forbundet til Supabase" : "Lokal demotilstand"}
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--paper)] shadow-[8px_8px_0_var(--pink)]">
          <div className="flex items-center justify-between border-b-2 border-[var(--ink)] px-6 py-5">
            <h3 className="font-display text-2xl tracking-[-0.03em]">Klubchatten</h3>
            <span className="rounded-full border border-[var(--ink)]/25 px-3 py-1 text-xs font-semibold text-[var(--muted)]">Offentlig demo</span>
          </div>

          <div className="flex min-h-[360px] max-h-[520px] flex-col gap-5 overflow-y-auto bg-[var(--cream)]/55 px-5 py-7 sm:px-7" aria-live="polite">
            {messages.map((item) => (
              <article className={`flex max-w-[88%] gap-3 ${item.isLocal ? "ml-auto flex-row-reverse" : ""}`} key={item.id}>
                <div className={`grid size-10 shrink-0 place-items-center rounded-full border-2 border-[var(--ink)] text-xs font-extrabold ${item.isLocal ? "bg-[var(--lime)]" : "bg-[var(--pink)]"}`}>
                  {initials(item.author)}
                </div>
                <div>
                  <div className={`mb-1 flex items-center gap-2 text-xs ${item.isLocal ? "justify-end" : ""}`}>
                    <span className="font-bold">{item.author}</span>
                    <time className="text-[var(--muted)]">{timeLabel(item.created_at)}</time>
                  </div>
                  <p className={`rounded-2xl border border-[var(--ink)]/20 px-4 py-3 leading-6 shadow-[3px_3px_0_rgba(21,30,58,0.1)] ${item.isLocal ? "rounded-tr-sm bg-[var(--blue)] text-white" : "rounded-tl-sm bg-[var(--paper)]"}`}>
                    {item.message}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <form className="border-t-2 border-[var(--ink)] bg-[var(--paper)] p-4 sm:p-5" onSubmit={sendMessage}>
            <div className="grid gap-3 sm:grid-cols-[150px_1fr_auto]">
              <label className="sr-only" htmlFor="chat-author">Dit navn</label>
              <input className="min-w-0 rounded-full border-2 border-[var(--ink)] bg-white px-4 py-3 outline-none focus:shadow-[4px_4px_0_var(--lime)]" id="chat-author" maxLength={40} onChange={(event) => setAuthor(event.target.value)} value={author} />
              <label className="sr-only" htmlFor="chat-message">Skriv en besked</label>
              <input className="min-w-0 rounded-full border-2 border-[var(--ink)] bg-white px-5 py-3 outline-none placeholder:text-[var(--muted)]/70 focus:shadow-[4px_4px_0_var(--lime)]" id="chat-message" maxLength={280} onChange={(event) => setDraft(event.target.value)} placeholder="Skriv en fiktiv besked…" value={draft} />
              <button className="grid size-12 place-items-center rounded-full border-2 border-[var(--ink)] bg-[var(--lime)] text-xl font-bold transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] disabled:cursor-not-allowed disabled:opacity-40" disabled={!author.trim() || !draft.trim() || isSending} type="submit">
                <span aria-hidden="true">↗</span>
                <span className="sr-only">Send besked</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
