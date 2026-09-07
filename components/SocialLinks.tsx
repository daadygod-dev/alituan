import Link from "next/link";
import { Button } from "./ui/button";

export default function SocialLinks() {
    return (

        <div className="flex  ">

            <div className="p-0.5 ">
                <Button variant={"link"}>
                    <Link href={"mailto:famousalituan@gmail.com"} className="">
                        E-mail
                    </Link>
                </Button>

            </div>

            <div className="p-0.5 ">
                <Button variant={"link"}>
                    <Link href={"https://linkedin.com/in/umuhoza-samuel"} className="">
                        Linkedin
                    </Link>
                </Button>

            </div>

            <div className="p-0.5 ">
                <Button variant={"link"}>
                    <Link href={"/"} className="">
                        Twitter(X)
                    </Link>
                </Button>

            </div>

            <div className="p-0.5 ">
                <Button variant={"link"}>
                    <Link href={"/"} className="">
                        Instagram
                    </Link>
                </Button>

            </div>


        </div>
    )
}