import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseKey = "YOUR_SUPABASE_ANON_KEY"

const supabase = createClient(supabaseUrl, supabaseKey)

/* LOAD POSTS */
async function loadPosts() {

  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending:false })

  const div = document.getElementById("posts");
  div.innerHTML = "";

  data.forEach(p => {
    div.innerHTML += `
      <div class="post">
        <h4>User</h4>
        <p>${p.content}</p>
      </div>
    `
  });
}

/* CREATE POST */
window.post = async function () {

  const text = document.getElementById("text").value;

  await supabase.from("posts").insert([
    { content: text }
  ]);

  loadPosts();
}

loadPosts();