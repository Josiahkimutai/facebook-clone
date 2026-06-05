import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://cpmzvqcoiknotpcutljh.supabase.co'

const supabaseKey = 'sb_publishable_iWUiLtL50Ptcm5sYVBUSvA_U7WyfV-f'

const supabase = createClient(supabaseUrl, supabaseKey)

window.signup = async function () {

    const email = document.getElementById('email').value

    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if(error){

        alert(error.message)

    }else{

        alert("Account created successfully")
    }
}

window.login = async function () {

    const email = document.getElementById('email').value

    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if(error){

        alert(error.message)

    }else{

        alert("Login successful")

        window.location.href = "home.html"
    }
}