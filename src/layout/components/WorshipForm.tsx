import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  points: number;
  rewardValue: number;
}

interface Props {
  initialValues?: FormValues;
  onSubmit: (data: FormValues) => Promise<void>;
  onClose: () => void;
}

export default function WorshipForm({
  initialValues,
  onSubmit,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: initialValues || { name: "", points: 0, rewardValue: 0 },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6">
      <div>
        <label className="block">Name</label>
        <input
          {...register("name", {
            required: "Name is required",
            maxLength: { value: 50, message: "Max length is 50 chars" },
          })}
          className="mt-1 w-full border rounded"
        />
        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block">Points</label>
        <input
          type="number"
          {...register("points", {
            required: "Points are required",
            min: { value: 0, message: "Points must be 0 or above" },
          })}
          className="mt-1 w-full border rounded"
        />
        {errors.points && (
          <p className="text-red-600">{errors.points.message}</p>
        )}
      </div>
      <div>
        <label className="block">Reward Value</label>
        <input
          type="number"
          {...register("rewardValue", {
            required: "Reward Value is required",
            min: { value: 0, message: "Reward must be 0 or above" },
          })}
          className="mt-1 w-full border rounded"
        />
        {errors.rewardValue && (
          <p className="text-red-600">{errors.rewardValue.message}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {initialValues ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
