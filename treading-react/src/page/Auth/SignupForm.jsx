import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { register } from '@/State/Auth/Action'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const SignupForm = () => {
    const dispatch = useDispatch()

  const form = useForm({
    resolver: "",
    defaultValues: {
        fullName: "",
        email: "",
        password: ""
    }
})

const onSubmit = (data) => {
    dispatch(register(data))
    console.log(data)
}

return (
    <div>
        <h1 className='text-xl font-bold text-center pb-3'>Create New Account</h1>
        <Form {...form}>

            <form
                className='space-y-6'
                onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    className="border w-full border-gray-700 p-5"
                                    placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    className="border w-full border-gray-700 p-5"
                                    placeholder="jay@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    className="border w-full border-gray-700 p-5"
                                    placeholder="Your password" {...field} />
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

export default SignupForm