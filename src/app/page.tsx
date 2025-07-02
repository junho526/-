import ChessGame from "@/components/chess-game";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto">
          <ChessGame />
        </div>
      </main>
    </div>
  );
}
