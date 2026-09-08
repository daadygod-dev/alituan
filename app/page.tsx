
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfilePcture from "@/components/ProfilePicture";
import Summary from "@/components/Summary";
import SocialLinks from "@/components/SocialLinks";
import Bottombar from "@/components/BottomBar";
import Professional from "@/components/Professional";
import Education from "@/components/Education";
import Projects from "@/components/Project";
import StackShowcase from "@/components/Stacks";
import LatestNotes from "@/components/LatestNotes";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white dark:bg-neutral-900 font-inter">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-start py-16 px-8 text-foreground border-none relative">

        <div className="w-full">
          <div className="flex w-full flex-col items-center sm:items-start">
            <ProfilePcture />
          </div>
        </div>
        <Summary />
        <SocialLinks />
        <Bottombar />
        <Professional />
        <Education />
        <Projects />
        <StackShowcase />
        <LatestNotes />
        <Footer />

      </main>
    </div>
  );
}
