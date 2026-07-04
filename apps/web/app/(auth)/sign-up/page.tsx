"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type SignupInput, signupSchema } from "@joo-joo-messenger/schemas";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignupMutate } from "@/hooks/use-auth";

export default function SignUp() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });
  const [isChecked, setIsChecked] = React.useState(false);

  const { mutate } = useSignupMutate();

  const onSubmit: SubmitHandler<SignupInput> = (payload) => {
    mutate(payload);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src="/images/signin-picture.png"
          alt="Register"
          fill
          priority
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col justify-center w-screen sm:w-full">
        <div className="flex w-full flex-col items-center px-4 py-6 sm:px-8 lg:px-16 xl:px-24">
          <CardContent className="px-0 py-4 sm:px-2 lg:px-8">
            <div className="mx-auto w-full max-w-xl">
              <div className="mt-8 space-y-2">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Create your account
                </h1>

                <h2 className="text-lg font-medium tracking-tight text-primary">
                  Join Joo-joo Messenger today
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    {...register("username")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    {...register("password")}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm_password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                  />
                </Field>

                <Field orientation="horizontal">
                  <Checkbox
                    id="terms-checkbox-basic"
                    name="terms-checkbox-basic"
                    checked={isChecked}
                    onCheckedChange={(checked) =>
                      setIsChecked(checked === true)
                    }
                  />
                  <FieldLabel htmlFor="terms-checkbox-basic">
                    <p>
                      I agree to the{" "}
                      <Link href="" className="text-primary">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="" className="text-primary">
                        Privacy Policy
                      </Link>
                    </p>
                  </FieldLabel>
                </Field>

                <Field>
                  <Button type="submit" className="h-12 w-full">
                    Create Account
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/sign-in" className="text-primary font-bold">
                    Sign in
                  </Link>
                </FieldDescription>
              </FieldGroup>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
