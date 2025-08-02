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
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 p-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        {initialValues ? "Edit Worship" : "Create New Worship"}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Worship Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 50, message: "Max length is 50 chars" },
            })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
            placeholder="Enter worship name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Points Value
          </label>
          <input
            type="number"
            {...register("points", {
              required: "Points are required",
              min: { value: 0, message: "Points must be 0 or above" },
            })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
            placeholder="Enter points value"
          />
          {errors.points && (
            <p className="mt-2 text-sm text-red-600">{errors.points.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Reward Value
          </label>
          <input
            type="number"
            {...register("rewardValue", {
              required: "Reward Value is required",
              min: { value: 0, message: "Reward must be 0 or above" },
            })}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-slate-900 placeholder-slate-400"
            placeholder="Enter reward value"
          />
          {errors.rewardValue && (
            <p className="mt-2 text-sm text-red-600">{errors.rewardValue.message}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : (initialValues ? "Update Worship" : "Create Worship")}
          </button>
        </div>
      </form>
    </div>
  );
}
