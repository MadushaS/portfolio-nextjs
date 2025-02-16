export default function Fallback({
  isLoading,
}: Readonly<{ isLoading: boolean }>) {
  return (
    <h2 className="text-xl font-semibold">
      {isLoading ? "Loading..." : "Containt Retrieval Failed"}
    </h2>
  );
}
