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
            <p className="text-base font-bold mb-2">Address List</p>
            {fields.map((field, index) => {
                const city = cityValue?.[index]?.city;
                return (
                    <div
                        key={field.id}
                        className="mb-6 pb-6 border-b border-gray-200"
                    >
                        <div className="mb-3">
                            <label className="block mb-1 font-semibold text-gray-700">
                                Street
                            </label>
                            <input
                                {...register(`addressList.${index}.street`)}
                                placeholder="Street"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.addressList?.[index]?.street
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                            />
                            {errors.addressList?.[index]?.street && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.addressList?.[index]?.street?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="block mb-1 font-semibold text-gray-700">
                                City
                            </label>
                            <input
                                {...register(`addressList.${index}.city`)}
                                placeholder="City"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.addressList?.[index]?.city
                                        ? "border-red-500"
                                        : "border-gray-300"
                                    }`}
                            />
                            {errors.addressList?.[index]?.city && (
                                <p className="text-red-600 mt-1 text-sm">
                                    {errors.addressList?.[index]?.city?.message}
                                </p>
                            )}
                        </div>
                        {city === "New York" && (
                            <div className="mb-3">
                                <label className="block mb-1 font-semibold text-gray-700">
                                    Zip Code
                                </label>
                                <input
                                    {...register(`addressList.${index}.zip`)}
                                    placeholder="Zip Code"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors?.addressList?.[index]?.zip
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }`}
                                />
                                {errors?.addressList?.[index]?.zip && (
                                    <p className="text-red-600 mt-1 text-sm">
                                        {errors?.addressList?.[index]?.zip?.message}
                                    </p>
                                )}
                            </div>
                        )}
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white transition-all px-3 py-1 rounded-md font-semibold mt-2"
                            type="button"
                            onClick={() => remove(index)}
                        >
                            Remove
                        </button>
                    </div>
                );
            })}

            <button
                className="bg-green-500 hover:bg-green-700 text-white transition-all px-4 py-2 rounded-md font-semibold"
                type="button"
                onClick={() => append({ street: "", city: "", zip: "" })}
            >
                Add Address
            </button>
        </div>
    );
};

export default OneNest;
