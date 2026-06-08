import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://pzrdyjpvueannxtpstlt.supabase.co'

// Use ANON KEY (NOT publishable key name confusion)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naWp6ZnF0bGVwemJiamZja3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDkwOTMsImV4cCI6MjA5NjIyNTA5M30.YbalMpRwvOeUFRzNGJSzh6UiOd9q0XWdAALeruoC0B4'

const supabase = createClient(supabaseUrl, supabaseKey)

/* ---------------- SIGN UP ---------------- */
window.signup = async function () {

    const email = document.getElementById('username').value
    const password = document.getElementById('password').value

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        alert(error.message)
        return
    }

    const user = data.user

    if (!user) {
        alert("User not created")
        return
    }

    /* create profile (safe insert) */
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert([
            {
                id: user.id,
                username: email
            }
        ])

    if (profileError) {
        alert(profileError.message)
    } else {
        alert("Account created successfully")
    }
}

/* ---------------- LOGIN ---------------- */
window.login = async function () {

    const email = document.getElementById('username').value
    const password = document.getElementById('password').value

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        alert("Incorrect email or password")
        return
    }

    if (data.session) {
        alert("Login successful")
        window.location.href = "home.html"
    }
}