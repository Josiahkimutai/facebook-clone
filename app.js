import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://pzrdyjpvueannxtpstlt.supabase.co'
const supabaseKey = 'sb_publishable_YpYLHHbRQ6u084gqC32lSg_f1tM3mmJ'

const supabase = createClient(supabaseUrl, supabaseKey)

/* SIGN UP */
window.signup = async function () {

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const { data, error } = await supabase.auth.signUp({
        email: username,
        password: password
    })

    if (error) {
        alert(error.message)
        return
    }

    if (!data.user) {
        alert("User not created")
        return
    }

    const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
                id: data.user.id,
                username: username
            }
        ])

    if (profileError) {

        alert(profileError.message)

    } else {

        alert("Account created successfully")
    }
}

/* LOGIN */
window.login = async function () {

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const { error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password
    })

    if (error) {

        alert("Incorrect email or password")

    } else {

        alert("Login successful")

        window.location.href = "home.html"
    }
}