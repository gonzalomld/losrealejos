export type Miga = { texto: string; href?: string };

export function Breadcrumbs({ migas }: { migas: Miga[] }) {
  return (
    <nav aria-label="Migas de pan" className="mx-auto max-w-6xl px-4 pt-4">
      <ol className="migas flex flex-wrap items-center gap-1 text-sm">
        <li>
          <a href="/" className="font-semibold text-primary underline underline-offset-4">
            Portada
          </a>
        </li>
        {migas.map((miga) => (
          <li key={miga.texto} className="miga">
            {miga.href ? (
              <a href={miga.href} className="font-semibold text-primary underline underline-offset-4">
                {miga.texto}
              </a>
            ) : (
              <span aria-current="page" className="font-semibold">
                {miga.texto}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
