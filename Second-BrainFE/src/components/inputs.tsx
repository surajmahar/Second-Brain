interface InputProps{
    placeholder: string;
    reference?: any;
}
export function Input({placeholder, reference}: InputProps)  {
    return <div>
        <input
         placeholder={placeholder}
          ref={reference}
          type="text"
          className="px-4 py-2 border rounded m-2 "
          />
      </div>
} 