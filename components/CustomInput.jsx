import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const CustomInput = ({ control, name, label, placeholder }) => {
  return (
    <FormField 
        control={control}
        name={name}
        render={({ field }) => (
            <div className="flex flex-col gap-1.5">
              <FormLabel className="text-xs text-gray-400 font-normal">
                {label}
              </FormLabel>
              <div className="flex w-full flex-col">
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    className="bg-white font-medium px-3 py-5 focus:border focus:border-default placeholder:text-gray-400 placeholder:text-xs placeholder:font-normal focus:border-darkGreen/60"
                    type={name === 'password' ? 'password' : 'text'}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] text-red-500 mt-2" />
              </div>
            </div>
          )}
    />
  )
}

export default CustomInput