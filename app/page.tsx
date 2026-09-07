
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfilePcture from "@/components/ProfilePicture";
import Summary from "@/components/Summary";
import SocialLinks from "@/components/SocialLinks";
import Bottombar from "@/components/BottomBar";
import Professional from "@/components/Professional";
import Education from "@/components/Education";
import Projects from "@/components/Project";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white dark:bg-neutral-900 font-inter">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center  py-16 px-16  text-foreground sm:items-start border-none relative ">
        
        <div>
          <ProfilePcture />
        </div>
        <Summary />
        <SocialLinks />
        <Bottombar />
        <Professional />
        <Education />
        <Projects />
      
      </main>
    </div>
  );
}
