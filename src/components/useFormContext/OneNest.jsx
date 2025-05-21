import { useFormContext, useFieldArray } from "react-hook-form";

const OneNest = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addressList",
    });

    const cityValue = watch("addressList");
    return (
        <div>
            <h3>Address List</h3>
            {fields.map((field, index) => {
                const city = cityValue?.[index]?.city.toLowerCase();
                return (
                    <div
                        key={field.id}
                        style={{
                            marginBottom: "10px",
                            paddingBottom: "10px",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <input
                            {...register(`addressList.${index}.street`)}
                            placeholder="Street"
                        />
                        {errors.addressList?.[index]?.street && (
                            <p style={{ color: "red" }}>
                                {errors.addressList?.[index]?.street?.message}
                            </p>
                        )}
                        <input
                            {...register(`addressList.${index}.city`)}
                            placeholder="City"
                        />
                        {errors.addressList?.[index]?.city && (
                            <p style={{ color: "red" }}>
                                {errors.addressList?.[index]?.city?.message}
                            </p>
                        )}

                        {city === "New York" && (
                            <>
                                <input
                                    {...register(`addressList.${index}.zip`)}
                                    placeholder="Zip Code"
                                />

                                {errors?.addressList?.[index]?.zip && (
                                    <p>{errors?.addressList?.[index]?.zip?.message}</p>
                                )}
                            </>
                        )}

                        <button type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                    </div>
                );
            })}

            <button
                type="button"
                onClick={() => append({ street: "", city: "", zip: "" })}
            >
                Append
            </button>
        </div>
    );
};

export default OneNest;
