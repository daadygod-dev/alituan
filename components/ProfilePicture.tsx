import Image from "next/image";


export default function ProfilePcture() {


    return (

        <div className="flex-1 flex-col gap-3.5 w-full ">
            <Image src={"/profile.jpg"} alt="Profile icture" loading="eager"
                className="w-20 h-20 rounded-full outline-4 outline-muted dark:outline-muted " width={60} height={60} />
            <div className=" py-3">
                <h3 className="flex gap-1 justify-center items-center flex-row">
                    <span className="font-semibold text-xl text-zinc-900 dark:text-zinc-100 ">
                        Samuel Umuhoza
                    </span>
                    <span className="my-auto font-thin ">
                        <Image src={"/seal-check.svg"} width={16} height={16}  alt="check" className="text-blue-600"/>
                       
                    </span>

                </h3>
                <p className="text-md dark:text-neutral-600 text-neutral-700">
                    Software Engineer
                </p>
            </div>
        </div>
    )
}