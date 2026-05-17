"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SectionHeader } from "./SectionHeader";

type CloseVariant = "A" | "B" | "C";

/**
 * FILE 009 — CARTA DE DESPEDIDA
 * El cierre emocional del archivo. Voz primera persona de J@voc.
 */
export function Carta() {
  const searchParams = useSearchParams();
  const variantParam = searchParams?.get("cierre")?.toUpperCase();
  const variant: CloseVariant =
    variantParam === "B" ? "B" : variantParam === "C" ? "C" : "A";

  return (
    <section
      id="carta"
      className="relative bg-tton-black py-32 md:py-48 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          fileNumber="009"
          kicker="CARTA DE DESPEDIDA"
          classification="TERMINATED"
          title={
            <>
              CARTA
              <br />
              FINAL.
            </>
          }
          intro={
            <>
              Lo que sigue es lo que tenía adentro hace tiempo. Lo escribo
              firmado, en primera persona, para que quede claro de dónde sale
              cada palabra. Es la pieza más personal del archivo.
            </>
          }
        />

        {/* Body */}
        <article className="prose-tton mt-12 space-y-8 text-tton-bone/90 font-body leading-relaxed text-base md:text-lg">

          <Para>
            <strong className="text-tton-bone">T-Tones y T-Tonas… queridos.</strong>{" "}
            Hoy es <em className="text-tton-amber not-italic">17 de mayo de 2026</em> y
            bajamos la persiana de{" "}
            <strong className="text-tton-bone">
              [T-TON] PROYECTO VERMIS: RENACIDOS — HARD PVE/SOCIAL
            </strong>
            , la última edición de T-Ton Island. Suena corto dicho así, pero
            atrás hay <strong className="text-tton-bone">4 años y 9 meses</strong> de
            comunidad, risas, bardo, eventos a las tres de la mañana, raids
            épicas, muertes injustas, bases que se cayeron, squads que
            nacieron, personajes que vivieron y amistades que ya no se borran.
          </Para>

          <Subheading>// ¿Y POR QUÉ CERRAR?</Subheading>

          <Para>
            Sin vueltas: <strong>la vida tiene ciclos</strong>. Siempre me tomé
            esto con la profesionalidad y la responsabilidad que merece, y en
            estos últimos tiempos sentí que ya no podía darle el tiempo que
            TTON realmente necesita. Sostener algo a medias no es opción.
            Prefiero <strong className="text-tton-bone">cerrar bien</strong>,
            agradecido por todo lo vivido, antes que dejar que se desgaste
            solo. No es un fracaso ni un abandono — es un cierre{" "}
            <em className="text-tton-amber not-italic">
              elegido, con la cabeza en alto y el corazón lleno.
            </em>
          </Para>

          <Subheading>// EL VERDADERO ORIGEN</Subheading>

          <Para>
            Para que se entienda de dónde viene esto, vuelvo un poco atrás.
            Yo juego SCUM desde su Early Access, <strong>agosto de 2018</strong>.
            Eran otros tiempos, otros servers, otras reglas — y otras
            injusticias. Una vez, en un raid importante de los que te marcan,
            sufrí <strong className="text-tton-bone">admin abuse</strong>. Sí, así
            de simple y así de feo. Y ahí me hice una promesa: si algún día
            yo armaba algo, los jugadores no iban a tener que pasar por eso.
          </Para>

          <Para>
            Tres años después, en{" "}
            <strong className="text-tton-bone">agosto de 2021</strong>, prendí el
            primer server. Tenía 35 años, hoy tengo 40 — sí, en TTON me dejé
            5 años de vida, los cuento sin lástima porque los firmaría de nuevo.
            Quería hacer un lugar donde detrás del avatar se reconociera que
            hay <em className="text-tton-amber not-italic">una persona real</em>,
            que está dedicando su tiempo, su atención, sus ganas. Eso es lo
            que tenía adentro. Lo demás… lo construimos entre todos.
          </Para>

          <Subheading>// LA INVERSIÓN</Subheading>

          <Para>
            No voy a poner cifras. Pero sí voy a ser honesto:{" "}
            <strong className="text-tton-bone">
              fueron pocos miles de dólares de mi bolsillo
            </strong>{" "}
            durante todos estos años, y horas que ya no se cuentan. Los
            primeros años, sobre todo, demandaron una cantidad de horas
            invertidas que hoy mirando para atrás me sorprende.
          </Para>

          <Para>
            Pasamos por tres hostings: arrancamos en{" "}
            <strong>Nitrado</strong>, después{" "}
            <strong>GPortal</strong> sostuvo los años de crecimiento, y
            terminamos en <strong>GG-Host</strong>. Cada uno una era, cada uno
            un capítulo técnico atrás de las islas. Hubo plugins pagos, bots
            customizados, sponsors que ayudaron, una donación anónima de
            2.000 dólares que destrabó momentos críticos. Y entre todo eso, plata mía que entró
            y nunca salió. Y está bien. Eligo no medir TTON en plata.
          </Para>

          <Subheading>// LAS ISLAS</Subheading>

          <Para>
            En los primeros años también tuvimos ediciones, aunque sin
            nombre propio — cada wipe que anunciaba SCUM era prácticamente
            una edición nueva para nosotros, pero no las formalizamos como
            tales. Después empezamos a darles identidad: Outfreak, Warfare,
            Esperanza, Ponzoña, Banana, Brava, y finalmente VERMIS — siete
            ediciones que la comunidad bautizó como islas. Cada una con su
            sabor, su gente, su locura, sus cicatrices. Banana fue la que
            nos hizo familia. VERMIS fue donde quisimos llevar todo más
            lejos. Las dejo en orden no porque sea historia cerrada, sino
            porque cada nombre devuelve un recuerdo distinto al que estuvo.
          </Para>

          <Subheading>// LO QUE LOGRAMOS — SIN MARKETING</Subheading>

          <Para>
            7 meses consecutivos al <strong>#1 de hablahispana</strong>. Top
            12 mundial. Aportamos a la traducción oficial del juego al
            español. Llegamos a tener 5 servers en simultáneo. Por TTON
            pasaron <strong>Beta Testers</strong> del propio juego — sello que
            pocos servers de habla hispana pueden mostrar. Y un principio que
            nunca negociamos:{" "}
            <strong className="text-tton-bone">no pay to win, jamás</strong>. Ni
            cuando podíamos ganar plata fácil, ni cuando hubiera sido más
            cómodo. El EULA de SCUM antes de que existiera formalmente — y
            después, también. Todo a fuerza de comunidad y noches sin dormir.
          </Para>

          <Subheading>// LA EDICIÓN QUE SOÑAMOS Y NO LLEGAMOS A CONCRETAR</Subheading>

          <Para>
            Acá viene una parte que duele un poco contar. Hasta el último
            tramo estuvimos cocinando una edición única, distinta a todo lo
            que TTON había hecho:{" "}
            <strong>inteligencia artificial aplicada por fuera del juego</strong>,
            eventos que respondían solos a lo que hacía la comunidad, NPCs con
            decisiones propias, una isla que evolucionaba mientras dormías.
            Habría sido posiblemente la edición más épica que TTON haya
            parido. Pero el tiempo nos ganó. La idea queda flotando — si algún
            día vuelve TTON, ya saben por dónde íbamos.
          </Para>

          <Subheading>// MÁS QUE SCUM</Subheading>

          <Para>
            También nos animamos a otros mundos: <strong>TTON Heim</strong>{" "}
            (Valheim) con sus jefes y construcciones,{" "}
            <strong>TTON Town</strong> (HumanitZ) que nació de las cenizas de
            Banana, y <strong>DayZ Rescate en Livonia</strong> que Ballroghdemon
            sostuvo durante toda su vida útil. Algunos duraron más, otros
            menos — todos dejaron historia.
          </Para>

          <Subheading>// EL EQUIPO QUE LLEGÓ AL FINAL</Subheading>

          <Para>
            Esto no lo cierro solo. Lo firmo en nombre del equipo que se
            bancó este último tramo:{" "}
            <strong className="text-tton-bone">Perro Karateka (Xemaxote)</strong>,
            cerebro creativo detrás de varias de las últimas ediciones —
            y además, la cámara y el alma audiovisual de TTON.{" "}
            <strong className="text-tton-bone">Tavo Montenegro (Tavito)</strong>,
            la cabeza fría — y sí, el Sr. Banhour también era él, ese
            personaje legendario.{" "}
            <strong className="text-tton-bone">Martín Lusa</strong>, el de la
            mano firme cuando hizo falta poner orden, el que tomó decisiones
            difíciles cuando el momento lo exigió. A los tres: gracias en
            serio. Sin ustedes este último ciclo no hubiera tenido ni la
            mitad del sabor.
          </Para>

          <Subheading>// GATO SAMURAY</Subheading>

          <Para>
            No me puedo despedir sin nombrarte. Fuiste admin en los primeros
            años, cuando esto era un experimento y nadie sabía si iba a durar
            dos meses. Te bancaste pibes nuevos a las 3 AM, raids
            inexplicables, mi locura. Sos un gran amigo que TTON me dejó, y
            eso vale más que cualquier rol. Gracias, Gato.
          </Para>

          <Subheading>// HERNANCHO</Subheading>

          <Para>
            Y una mención que merece párrafo propio:{" "}
            <strong className="text-tton-bone">Hernancho</strong>. Era
            colega de equipo. Una vez, en plena defensa de un raid que
            estábamos perdiendo de la manera más injusta del mundo, Hernan
            arrancó con las puteadas — en el modo argentino más puro, ese
            que solo entiende quien estuvo del otro lado de un raid injusto
            a las cuatro de la mañana. Y de un insulto original y hermoso,{" "}
            <em className="text-tton-amber not-italic">hermoso en serio</em>,
            se me prendió la lamparita: ahí, en ese instante, nació en mi
            cabeza el nombre del server que algún día iba a montar. Sin ese
            raid, sin esa puteada, sin Hernan — TTON no se llamaría TTON.
            Gracias, Hernancho, por la palabra que terminó definiendo todo.
          </Para>

          <Subheading>// EL HONOR DE SCUM EN ESPAÑOL</Subheading>

          <Para>
            Este proyecto me regaló cosas que ni soñaba. Una de las más
            grandes: que <strong>Mini</strong> y <strong>Morpheo</strong> me
            abrieran la puerta para ser Mod y parte del{" "}
            <strong className="text-tton-bone">canal oficial de Scum en Español</strong>.
            Para mí fue un honor enorme. Gracias por creer en mí.
          </Para>

          <Subheading>// A VOS, SIN NOMBRARTE</Subheading>

          <Para>
            En diciembre de 2023, alguien — que pidió{" "}
            <em className="text-tton-amber not-italic">explícitamente</em> no
            ser nombrado — donó <strong>2.000 dólares</strong> para que el
            server siguiera adelante. A mí me hubiera encantado anunciarlo
            como cada avance en{" "}
            <span className="font-mono text-tton-amber">#anuncios</span>, con
            su nombre bien arriba y todo el reconocimiento que se ganó — pero
            respeto su pedido al pie de la letra. Sin ese gesto, varias de
            las cosas que terminamos construyendo no hubieran sido posibles.
            Vos sabés perfectamente quién sos. Gracias por confiar cuando
            confiar era difícil.
          </Para>

          <Subheading>// LO QUE NO FUE FÁCIL</Subheading>

          <Para>
            Sería deshonesto pintar todo color de rosa. Hubo discusiones,
            alianzas que se rompieron, distanciamientos, decisiones que dolió
            tomar, despedidas que no fueron por nada bueno. Incluso me tocó
            tener que <strong className="text-tton-bone">bannear a un admin</strong>{" "}
            — una de esas decisiones que un owner espera nunca tener que
            firmar, pero que cuando hace falta, no se duda. No las niego ni
            las disfracé. Pero algo se sostuvo desde el día cero hasta hoy
            mismo, sin negociarlo nunca:{" "}
            <strong className="text-tton-amber">el respeto como estandarte</strong>.
            Sea con quien sea, pasara lo que pasara. Esa fue siempre la línea.
            Por eso lo que dolió duele menos hoy — porque se hizo desde un
            lugar correcto.
          </Para>

          <Subheading>// A VOS, T-TON</Subheading>

          <Para>
            Sí, vos. El que está leyendo esto. El que pasó una noche en
            Banana sin saber para dónde correr. El que aprendió a lockpickear
            con tutoriales en español. El que se enojó con un wipe y volvió
            igual. El que se hizo squad con dos desconocidos y terminó siendo
            amigo para siempre. El que mandó un meme al canal y nos hizo
            cagar de risa. El que ayudó a un noob sin esperar nada a cambio.
            El que ganó un sorteo, el que perdió todo en un raid, el que
            volvió a empezar. El que esperaba una edición PVE y se la bancó
            jugando en otros servers cuando la nuestra venía muy PVP,
            sabiendo que la próxima podía ser la suya. Y así tantos otros
            perfiles más — cada uno con su historia.
          </Para>

          <Para className="text-tton-bone text-xl md:text-2xl font-medium">
            Gracias a vos, esto existió.
          </Para>

          <Para>
            Porque al final del día, T-Ton nunca fue un server. Fue una{" "}
            <strong className="text-tton-amber">comunidad</strong>. Fue un
            pedazo de internet donde, durante casi cinco años, se podía
            hablar en español, jugar limpio, reírse fuerte y encontrar amigos.
          </Para>

          <Subheading>// ¿Y AHORA QUÉ?</Subheading>

          <Para>
            Hoy se cierra el server, pero{" "}
            <strong className="text-tton-bone">no se cierra TTON</strong>. Lo
            que vivimos no se apaga. Las amistades quedan. Las historias
            quedan. Los memes quedan.
          </Para>

          <Para>
            <strong className="text-tton-amber">El Discord queda abierto.</strong>{" "}
            No como museo, sino como un lugar vivo: para seguir en contacto,
            para compartir actividad de quien quiera, para mostrar lo que cada
            uno está haciendo. Y especialmente: acá vamos a comunicar todo
            nuevo proyecto — sea mío personal, o de alguien que considere que
            vale la pena darle visibilidad por el valor que aporta a la
            comunidad. Siempre con el mismo respeto que nos caracterizó.
          </Para>

          <Para>
            Quizás algún día, cuando menos lo esperemos, una isla vuelva a
            aparecer. O algo distinto. O algo mejor. O nada. Lo que sí sé es
            que lo que construimos juntos no tiene fecha de vencimiento, y
            que esta puerta queda entreabierta para lo que venga.
          </Para>

          {/* Closing block — renderiza variante según ?cierre=A|B|C */}
          <ClosingBlock variant={variant} />

          {/* Variant switcher (dev/preview) */}
          <VariantSwitcher current={variant} />

          {/* Contacto — invitación a seguir en Discord */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-12 pt-8 border-t border-tton-amber/15"
          >
            <p className="hud-text text-tton-amber mb-4">// SEGUIME ESCRIBIENDO</p>
            <p className="text-tton-bone/85 font-body leading-relaxed text-base md:text-lg mb-6">
              Si querés charlar, compartir una historia, mandar una foto
              que se haya perdido, o simplemente decir hola — la puerta
              queda abierta. El Discord de TTON sigue vivo, y yo también
              estoy ahí. Cualquier T-Ton es bienvenido cuando quiera.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://discord.gg/kaM93n7u4k"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-amber bg-tton-amber text-tton-black hover:bg-tton-rust hover:border-tton-rust transition-colors"
                data-cursor-hover
              >
                <DiscordIcon className="h-4 w-4" />
                ENTRAR AL DISCORD DE TTON
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com/users/510541406721409025"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-text inline-flex items-center gap-2 px-5 py-3 border-2 border-tton-bone/30 text-tton-bone hover:border-tton-amber hover:text-tton-amber transition-colors"
                data-cursor-hover
              >
                ESCRIBIRME A MÍ
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 hud-text text-tton-bone/50">
              @J@voc · DISCORD ID 510541406721409025
            </p>
          </motion.div>
        </article>
      </div>
    </section>
  );
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.156-1.086-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.333-.956 2.419-2.156 2.419zm7.974 0c-1.182 0-2.156-1.086-2.156-2.419 0-1.333.955-2.418 2.156-2.418 1.21 0 2.175 1.094 2.156 2.418 0 1.333-.946 2.419-2.156 2.419z" />
    </svg>
  );
}

function Para({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="hud-text text-tton-amber pt-4"
    >
      {children}
    </motion.h3>
  );
}

// ─────────────────────────────────────────────
// CLOSING BLOCK — 3 variantes de integración de la foto
// Visible vía ?cierre=A|B|C (default A)
// ─────────────────────────────────────────────

function ClosingBlock({ variant }: { variant: CloseVariant }) {
  return (
    <div className="relative pt-8 border-t border-tton-amber/20">
      {/* Variante B: ghost backdrop */}
      {variant === "B" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-8 right-0 hidden md:block"
          style={{
            width: "360px",
            height: "360px",
            opacity: 0.1,
            filter: "blur(2px) grayscale(0.4)",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/javoc-cheers.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Variante C: brindis explícito al inicio del cierre */}
      {variant === "C" && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex flex-col items-center text-center mb-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/javoc-cheers.png"
            alt="J@voc brindando"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-tton-amber/60"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,176,0,0.18), 0 0 40px rgba(255,176,0,0.18)",
            }}
          />
          <p className="mt-6 font-heading italic text-tton-amber text-3xl md:text-4xl leading-none">
            ¡Salud, T-Tones!
          </p>
          <p className="mt-3 hud-text text-tton-bone/55">
            // EL ÚLTIMO BRINDIS
          </p>
        </motion.div>
      )}

      <p className="relative font-defused text-tton-bone text-2xl md:text-3xl uppercase tracking-tight leading-tight">
        Gracias.
        <br />
        Gracias por tanto tiempo.
        <br />
        Gracias por confiar en este loco
        <br />
        que un dia se le ocurrio montar un server.
      </p>
      <p className="relative mt-8 font-body text-tton-bone/80 text-base md:text-lg italic">
        Hasta siempre, T-Tones. Hasta siempre, T-Tonas.
        <br />
        Con el corazón en la mano,
      </p>

      {/* Signature — Variante A: avatar circular; B y C: solo Heart */}
      {variant === "A" ? (
        <div className="relative mt-6 flex items-center gap-4">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/javoc-cheers.png"
              alt="J@voc brindando"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-tton-amber/50"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,176,0,0.15), 0 0 24px rgba(255,176,0,0.12)",
              }}
            />
            <Heart
              className="absolute -bottom-1 -right-1 h-4 w-4 text-tton-blood fill-current bg-tton-black rounded-full p-0.5"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="font-defused text-tton-amber text-2xl tracking-tight">
              J@VOC
            </p>
            <p className="hud-text text-tton-bone/50 mt-0.5">
              OWNER · T-TON ISLAND · AGO 2021 — MAY 2026
            </p>
          </div>
        </div>
      ) : (
        <div className="relative mt-6 flex items-center gap-3">
          <Heart className="h-5 w-5 text-tton-blood fill-current" />
          <div>
            <p className="font-defused text-tton-amber text-2xl tracking-tight">
              J@VOC
            </p>
            <p className="hud-text text-tton-bone/50 mt-0.5">
              OWNER · T-TON ISLAND · AGO 2021 — MAY 2026
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function VariantSwitcher({ current }: { current: CloseVariant }) {
  const variants: { id: CloseVariant; label: string; desc: string }[] = [
    { id: "A", label: "A", desc: "Avatar en la firma" },
    { id: "B", label: "B", desc: "Ghost backdrop" },
    { id: "C", label: "C", desc: "Brindis al inicio" },
  ];
  return (
    <div className="mt-10 px-4 py-3 border border-tton-amber/30 bg-tton-amber/[0.04] flex flex-wrap items-center gap-3">
      <span className="hud-text text-tton-amber/80">// PREVIEW</span>
      <span className="text-tton-bone/70 font-body text-sm">
        Probá las 3 variantes de cómo aparece la foto:
      </span>
      <div className="flex flex-wrap gap-2 ml-auto">
        {variants.map((v) => (
          <a
            key={v.id}
            href={`/carta?cierre=${v.id}`}
            className={`hud-text inline-flex items-center gap-2 px-3 py-1.5 border transition-colors ${
              v.id === current
                ? "border-tton-amber bg-tton-amber text-tton-black"
                : "border-tton-bone/30 text-tton-bone/80 hover:border-tton-amber hover:text-tton-amber"
            }`}
            data-cursor-hover
          >
            <strong>{v.label}</strong>
            <span className="opacity-75 hidden md:inline">— {v.desc}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
