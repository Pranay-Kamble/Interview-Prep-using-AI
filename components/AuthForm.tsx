"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image";
import Link from "next/link";
import { FormField } from "@/components/FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {

    return z.object({
        name: type === "sign-up" ? z.string().min(3).max(50) : z.string().optional(),
        email: z.email(),
        password: z.string().min(3)
    })
}

const AuthForm = ({type} : {type: FormType}) => {

    console.log("Received: " + type);

    const formSchema = authFormSchema(type)
    const router= useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-in') {
                toast.success("Sign in successful.")
                console.log(`Sign In: ${values}`)
                router.push('/') //update when other routes are created, for now I am pushing to home page
            }else {
                toast.success("Account created. Please login")
                console.log(`Sign Up: ${values}`)
                router.push('/sign-in')
            }
        }catch(error) {
            console.log(error)
            toast.error(`There was an error: ${error}`)
        }
    }

    const isSignIn = type === "sign-in";

    return (
        <div className={"card-border lg:min-w-[566px]"}>

            <div className={"flex flex-col gap-6 card py-14 px-10"}>

                <div className={"flex flex-row gap-2 justify-center"}>
                    <Image src={"/logo.svg"} alt={"logo"} height={32} width={38}/>
                    <h2 className={"text-primary-100"}>Interview Prep</h2>
                </div>

                <h3>Practice job interview with AI</h3>

                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder={"name"} />}

                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder={"example@email.com"}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder={"password"}
                            type={"password"}
                        />
                        <Button className="btn" type="submit">{ isSignIn ? "Sign in" : "Create an account"}</Button>
                    </form>

                </Form>

                <p className={"text-center"}>{isSignIn ? "Don't have an account?" : "Have an account already?"}
                    <Link href={ isSignIn ? '/sign-up' : "/sign-in"} className={"font-bold text-user-primary ml-1"}>
                        {isSignIn ? "Sign up" : "Login" }
                    </Link>
                </p>

            </div>
        </div>
    )

}
export default AuthForm
