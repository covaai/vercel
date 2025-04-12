create or replace function match_documents (
  query_embedding vector(1536),
  match_count int default null
) returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    id,
    content,
    metadata,
    1 - (document_embeddings.embedding <=> query_embedding) as similarity
  from document_embeddings
  order by document_embeddings.embedding <=> query_embedding
  limit match_count;
end;
$$; 