import { useFormContext, useFieldArray } from "react-hook-form";

const OneNest = () => {
    const { register, control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "addressList",
    });

    return (
        <div>
            <h3>Address List</h3>
            {fields.map((field, index) => (
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
                    <input
                        {...register(`addressList.${index}.city`)}
                        placeholder="City"
                    />
                    <button type="button" onClick={() => remove(index)}>
                        Remove
                    </button>
                </div>
            ))}

            <button type="button" onClick={() => append({ street: "", city: "" })}>
                Append
            </button>
        </div>
    );
};

export default OneNest;
