"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageCircle, Send, Trash2 } from "lucide-react";

interface Comment {
  id: string;
  roast_id: string;
  user_id: string;
  user_email: string;
  content: string;
  created_at: string;
}

interface CommentsProps {
  roastId: string;
}

export default function Comments({ roastId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const supabase = createClient();

  // Verificar si el usuario está logueado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cargar comentarios
  useEffect(() => {
    loadComments();
  }, [roastId]);

  const loadComments = async () => {
    setLoadingComments(true);
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("roast_id", roastId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setComments(data);
    }
    setLoadingComments(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert({
      roast_id: roastId,
      user_id: user.id,
      user_email: user.email,
      content: newComment.trim(),
    });

    if (!error) {
      setNewComment("");
      loadComments();
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", user?.id);

    if (!error) {
      loadComments();
    }
  };

   return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-red-500" />
        Comentarios ({comments.length})
      </h2>

      {/* Formulario de nuevo comentario */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Comparte tu opinión sobre este roast..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {newComment.length}/500
              </span>
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {loading ? "Enviando..." : "Comentar"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 bg-gray-900 border border-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-400 mb-4">
            Solo usuarios registrados pueden comentar.
           </p>
        </div>
      )}

      {/* Lista de comentarios */}
      {loadingComments ? (
        <div className="text-center py-8 text-gray-500">
          Cargando comentarios...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-white">
                    {comment.user_email.split("@")[0]}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.created_at).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {user?.id === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    title="Eliminar comentario"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}