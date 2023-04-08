import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../models/user';
import * as NotesApi from "../network/notes_api";
import { LoginCredentials } from "../network/notes_api";
import TextInputField from './form/TextInputField';
import { UnauthorizedError } from '../errors/http_errors';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,

}

function LoginModal({ onLoginSuccessful, onDismiss }: LoginModalProps) {
    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();
    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto ">
                <div className="flex items-center justify-center min-h-screen px-4 py-8">
                    <div className="relative w-full h-full max-w-md md:h-auto  shadow-black shadow-2xl">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg onClick={() => onDismiss()} aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Log in</h3>
                                {errorText && <Alert
                                    color="failure"
                                    icon={HiInformationCircle}
                                >
                                    <span>
                                        <span className="font-medium">
                                            Info alert!
                                        </span>
                                       {' '} {errorText}
                                    </span>
                                </Alert>}
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    <TextInputField
                                        name="username"
                                        label="Username"
                                        type="text"
                                        placeholder="Username"
                                        register={register}
                                        registerOptions={{ required: "Required" }}
                                        error={errors.username}
                                    />
                                    <TextInputField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        placeholder="Password"
                                        register={register}
                                        registerOptions={{ required: "Required" }}
                                        error={errors.password}
                                    />
                                    <div className="flex">
                                        <button className="ml-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            type="submit"
                                            disabled={isSubmitting}>
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
export default LoginModal
