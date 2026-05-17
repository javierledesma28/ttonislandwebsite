import { auth, signIn, signOut } from "@/auth";
import { getMessages } from "@/app/actions/messages";
import { SectionHeader } from "./SectionHeader";
import { MessageForm } from "./MessageForm";
import { MessagesList } from "./MessagesList";

/**
 * FILE 007 — INCOMING TRANSMISSIONS
 * Server Component: renders the form (auth-aware) and the message list.
 */
export async function Mensajes() {
  const session = await auth();
  // @ts-expect-error custom session field
  const isAdmin = !!session?.user?.isAdmin;
  const messages = await getMessages({ includeHidden: isAdmin });

  return (
    <section
      id="mensajes"
      className="relative bg-tton-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          fileNumber="007"
          kicker="INCOMING TRANSMISSIONS"
          classification="ACTIVE"
          title={
            <>
              MENSAJES
              <br />
              DE LOS TETONES.
            </>
          }
          intro={
            <>
              Esta puerta queda entreabierta. Dejá tu firma — para que
              cualquiera que vuelva mañana lea lo que TTON fue para vos.
              Cinco años de comunidad merecen testimonios.
            </>
          }
        />

        {/* Auth + form */}
        <div className="mt-12">
          {session?.user ? (
            <LoggedInForm
              user={{
                name: session.user.name || "Anónimo",
                image: session.user.image || null,
                // @ts-expect-error
                isStaff: !!session.user.isStaff,
                // @ts-expect-error
                isAdmin: !!session.user.isAdmin,
              }}
              signOutAction={async () => {
                "use server";
                await signOut({ redirectTo: "/mensajes" });
              }}
            />
          ) : (
            <LoginPrompt
              signInAction={async () => {
                "use server";
                await signIn("discord", { redirectTo: "/mensajes" });
              }}
            />
          )}
        </div>

        {/* Messages stream */}
        <div className="mt-16">
          <p className="hud-text text-tton-amber/60 mb-6 inline-flex items-center gap-2">
            <span className="online-dot" />
            STREAM ABIERTO — {messages.length} TRANSMISIÓN{messages.length === 1 ? "" : "ES"} REGISTRADA{messages.length === 1 ? "" : "S"}
          </p>
          <MessagesList messages={messages} isAdmin={isAdmin} />
        </div>
      </div>
    </section>
  );
}

function LoginPrompt({ signInAction }: { signInAction: () => Promise<void> }) {
  return (
    <form action={signInAction} className="liquid-glass p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="rec-dot mt-2" />
        <div>
          <p className="hud-text text-tton-amber mb-2">
            // ACCESS REQUIRED
          </p>
          <p className="text-tton-bone/90 font-body leading-relaxed">
            Necesitás iniciar sesión con tu cuenta de{" "}
            <span className="text-tton-amber font-semibold">Discord</span> para
            dejar tu transmisión. Usamos tu nick y avatar del Discord — sin
            mails, sin contraseñas, sin spam.
          </p>
        </div>
      </div>
      <button
        type="submit"
        className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-amber bg-tton-amber text-tton-black hover:bg-tton-rust hover:border-tton-rust transition-colors"
        data-cursor-hover
      >
        <DiscordIcon className="h-4 w-4" />
        INICIAR SESIÓN CON DISCORD
      </button>
    </form>
  );
}

function LoggedInForm({
  user,
  signOutAction,
}: {
  user: { name: string; image: string | null; isStaff: boolean; isAdmin: boolean };
  signOutAction: () => Promise<void>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 liquid-glass p-3">
        <div className="flex items-center gap-3">
          {user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full border border-tton-amber/40"
            />
          )}
          <div>
            <p className="hud-text text-tton-amber/70">// AUTENTICADO COMO</p>
            <p className="font-body text-tton-bone">
              {user.name}
              {user.isAdmin && (
                <span className="ml-2 hud-text text-tton-blood">[ADMIN]</span>
              )}
              {user.isStaff && !user.isAdmin && (
                <span className="ml-2 hud-text text-tton-amber">[STAFF]</span>
              )}
            </p>
          </div>
        </div>
        <form action={signOutAction}>
          <button
            type="submit"
            className="hud-text px-3 py-1.5 border border-tton-bone/30 text-tton-bone/70 hover:border-tton-amber hover:text-tton-amber transition-colors"
            data-cursor-hover
          >
            CERRAR SESIÓN
          </button>
        </form>
      </div>
      <MessageForm />
    </div>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.156-1.086-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.333-.956 2.419-2.156 2.419zm7.974 0c-1.182 0-2.156-1.086-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.333-.946 2.419-2.156 2.419z" />
    </svg>
  );
}
