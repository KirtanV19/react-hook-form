import { FormProvider, useForm } from "react-hook-form";
import OneNest from "./OneNest";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required("Firstname is required"),
    addressList: yup.array().of(
        yup.object().shape({
            street: yup.string().required("Street is required"),
            city: yup.string().required("City is reuired"),
        })
    ),
});
const One = () => {
    const methods = useForm({
        mode: "all",
        defaultValues: {
            firstName: "",
            addressList: [{ street: "", city: "" }],
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => console.log("data", data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <input {...methods.register("firstName")} placeholder="First Name" />
                {methods?.formState?.errors?.firstName && (
                    <p style={{ color: "red" }}>
                        {methods?.formState?.errors?.firstName?.message}
                    </p>
                )}
                <OneNest />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    );
};

export default One;
