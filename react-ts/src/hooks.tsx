import { useCallback, useState } from "react";


export  function useInput( init: string = '') {

  const [value, setValue ] = useState(init)

  const onChange = useCallback(function(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }, [])

    return{
      value,
      onChange,
    }
  }




