export default function Contact() {
    return (
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="heading text-center">
                    Contact Us
                </h2>
                <p className="text__para mb-8 lg:mb-16 font-light text-center">
                    Got a technical issue? Want to send feedback about a beta feature? Let us know.
                </p>
                <form action="#" className="space-y-8">
                    <div>
                        <label htmlFor="email" className="form__label dark:text-slate-300">
                            Email *
                        </label>
                        <input type="email" id="email" placeholder="example@gmail.com" className="form__input mt-1" required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="form__label dark:text-slate-300">
                            Subject *
                        </label>
                        <input type="text" id="subject" placeholder="How we can help you" className="form__input mt-1" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="form__label dark:text-slate-300">
                            Message *
                        </label>
                        <textarea rows={5} id="message" placeholder="Leave your message..." className="form__input mt-1" required />
                    </div>
                    <button type="submit" className="btn rounded-lg sm:w-fit">
                        Send
                    </button>
                </form>
            </div>
        </section>
    )
}
