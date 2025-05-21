import { FormProvider, useForm } from "react-hook-form";
import OneNest from "./OneNest";

const One = () => {
    const methods = useForm({
        mode: "all",
        defaultValues: {
            firstName: "",
            addressList: [{ street: "", city: "" }],
        },
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <input {...methods.register("firstName")} placeholder="First Name" />
                <OneNest />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

export default One;
