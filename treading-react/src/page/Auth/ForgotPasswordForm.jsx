import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

const ForgotPasswordForm = () => {
    const form = useForm({
        resolver: "",
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <h1 className='text-xl font-bold text-center pb-3'>Forgot password</h1>
            <Form {...form}>

                <form
                    className='space-y-6'
                    onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="border w-full border-gray-700 p-5"
                                        placeholder="enter your email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />





                    <Button type="submit" className="w-full py-5">
                        Submit
                    </Button>
                </form>

            </Form>

        </div>
    )
}

export default ForgotPasswordForm