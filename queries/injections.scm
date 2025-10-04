; Inject highlighting for string interpolations in f-strings
(fstring_interpolation
  ((_) @injection.content
    (#set! injection.language "razen")))

; Comment injections for documentation
((comment) @injection.content
  (#set! injection.language "comment"))
