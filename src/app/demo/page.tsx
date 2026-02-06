import { GenerativeArt } from "@/components/ui/generative-art";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function DemoOne() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24">
                <GenerativeArt />
            </div>
            <Footer />
        </main>
    );
}
