import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-between h-full">
                <Link href="https://www.instagram.com/anidnurma/">
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image 
                        src="/instagram.png" 
                        alt="Instagram" 
                        height={32} 
                        width={32} 
                        className="rounded-md"/>
                    </Button>
                </Link>
                <p className="text-slate-500">
                    Thesis Project by anidnurma
                </p>
                <Link href="https://www.upi.edu/">
                    <Button size="lg" variant="ghost" className="w-full">
                        <Image 
                        src="/logo_upi.svg"
                        alt="Logo UPI"
                        height={36}
                        width={36}
                        className="rounded-md"/>
                    </Button>
                </Link>
            </div>
        </footer>
    );
};