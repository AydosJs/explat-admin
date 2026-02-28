export function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100dvh-104px)] w-full flex-col items-center justify-center px-4 text-center">
      <p className="mt-6 font-mono text-8xl font-bold tracking-tighter text-foreground">
        404
      </p>
      <h1 className="mt-4 text-xl font-semibold text-foreground">
        Страница не найдена
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Такой страницы не существует или она была перемещена. Вернитесь на главную.
      </p>
    </div>
  );
}
