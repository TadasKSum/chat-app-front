import React, {useEffect, useRef, useState} from 'react';
import http from "@/plugins/http";
import usePrivateStore from "@/store/privateStore";

const ProfileSettings = () => {
    // States
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePassword2, setHidePassword2] = useState(true)
    const [errorMessagePicture, setErrorMessagePicture] = useState(null)
    const [successMessagePicture, setSuccessMessagePicture] = useState(null)
    const [errorMessagePassword, setErrorMessagePassword] = useState(null)
    const [successMessagePassword, setSuccessMessagePassword] = useState(null)
    // Refs
    const pictureInput = useRef();
    const pass1Input = useRef()
    const pass2Input = useRef()
    // Zustand
    const {user, setUser} = usePrivateStore();
    // Use effect
    useEffect(() => {
        if(successMessagePicture) {
            const timer = setTimeout(() => {
                setSuccessMessagePicture(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessagePicture]);

    useEffect(() => {
        if(successMessagePassword) {
            const timer = setTimeout(() => {
                setSuccessMessagePassword(null)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessagePassword]);

    // Functions
    function isValidUrl(string) {
        try {
            return Boolean(new URL(string))
        } catch (e) {
            return false
        }
    }
    async function changePicture() {
        // Clear messages
        setSuccessMessagePicture(null)
        setErrorMessagePicture(null)
        // Get token
        const token = user.token;
        const newPicture = pictureInput.current?.value;

        if (!isValidUrl(newPicture)) {
            return setErrorMessagePicture("Input must be a valid URL")
        }

        const data = {
            picture: pictureInput.current?.value,
        }

        const res = await http.postAuth("/change-picture", data, token)

        if (res.success) {
            setSuccessMessagePicture(res.message)
            setUser({picture: res.data.picture,})
        }
    }
    async function changePassword() {
        // Clear messages
        setSuccessMessagePassword(null)
        setErrorMessagePassword(null)
        // Get token
        const token = user.token;
        // Regex test
        let regex = /[!@#$%^&*_+]/

        if (pass1Input.current?.value.length < 5 || pass1Input.current?.value.length > 20) {
            return setSuccessMessagePassword("Password must be between 5 and 20 characters.")
        }
        if (!regex.test(pass1Input.current?.value)) {
            return setSuccessMessagePassword("Password must include at least one of following symbols: !@#$%^&*_+")
        }
        if (pass1Input.current?.value !== pass2Input.current?.value) {
            return setSuccessMessagePassword("Password must match.")
        }

        const data = {
            passOne: pass1Input.current?.value,
            passTwo: pass2Input.current?.value
        }

        const res = await http.postAuth("/change-password", data, token)

        if (res.success) {
            setSuccessMessagePassword(res.message)
        } else {
            setErrorMessagePassword(res.message)
        }
    }

    return (
        <div className="grow">
            <div className="gap-3 flex flex-col">
                <div className="text-2xl">Change Profile Picture</div>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Insert Image URL:</span>
                    </div>
                    <input
                        type="text"
                        placeholder="https://exampleimage.png"
                        className="input input-bordered w-full max-w-xs"
                        ref={pictureInput}
                    />
                </label>
                {errorMessagePicture && <div role="alert" className="alert min-w-lg max-w-fit alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>{errorMessagePicture}</span>
                </div>}
                {successMessagePicture && <div role="alert" className="alert min-w-lg max-w-fit alert-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{successMessagePicture}</span>
                </div>}
                <button className="btn btn-primary max-w-fit" onClick={changePicture}>Confirm</button>
            </div>

            <div className="flex w-full flex-col">
                <div className="divider divider-primary"></div>
            </div>

            <div className="gap-3 flex flex-col">
                <div className="text-2xl">Change Password</div>
                <span className="label-text">Insert new password:</span>
                <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
                    <button onClick={() => setHidePassword(!hidePassword)}>
                        {hidePassword ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                            </svg>
                        }
                    </button>
                    <input
                        ref={pass1Input}
                        type={hidePassword ? "password" : "text"}
                        placeholder="Password"
                        className="grow"
                        maxLength="20"
                    />
                </label>
                <span className="label-text">Repeat new password:</span>
                <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
                    <button onClick={() => setHidePassword2(!hidePassword2)}>
                        {hidePassword2 ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                            </svg>
                        }
                    </button>
                    <input
                        ref={pass2Input}
                        type={hidePassword2 ? "password" : "text"}
                        placeholder="Repeat Password"
                        className="grow"
                        maxLength="20"
                    />
                </label>
                {errorMessagePassword && <div role="alert" className="alert min-w-lg max-w-fit alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span>{errorMessagePassword}</span>
                </div>}
                {successMessagePassword && <div role="alert" className="alert min-w-lg max-w-fit alert-success">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{successMessagePassword}</span>
                </div>}
                <button className="btn btn-primary max-w-fit" onClick={changePassword}>Confirm</button>
            </div>
        </div>
    );
};

export default ProfileSettings;