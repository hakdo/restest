# restest
REST API demo: typical vulnerabilities

# /snake/:type
Verbose error message

# /secret/tellme
API key exposed in URL. Unsanitized user input written to log file.

# /insecure/code
Returns unsanitized user input directly in <script></script> tags.

# /logs
Log viewer that directly inserts the log file into HTML with no escaping/sanitiation.
