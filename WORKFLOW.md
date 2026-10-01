# AI-Assisted Development Workflow

## Round 1: Vague Prompt

The first version of the settings form was created using a short and general prompt. The goal was to let the AI decide the implementation details with minimal guidance. The resulting feature included a settings form with display name, email, bio, and theme fields along with client-side validation.

The implementation worked, but the AI had more freedom to decide the structure and validation behavior. This resulted in a larger change across multiple files, including the HTML, CSS, JavaScript, and server files.

## Round 2: Precise Prompt

For the second round, the task requirements were specified more clearly. The existing project structure and coding style were considered, and the implementation was expected to avoid unnecessary dependencies. Specific validation requirements were also defined.

The second version focused on refining the existing validation rather than adding unnecessary functionality. Input values were made safer by handling missing values, and email input was normalized using trimming and lowercase conversion. The existing validation behavior for display name, bio, and theme was preserved.

## Comparison

The vague approach was faster for producing an initial working feature because fewer constraints were provided. However, it gave the AI more freedom over implementation choices and resulted in a broader set of changes.

The precise approach provided more control over the final result. By specifying validation behavior, project constraints, and verification requirements, the changes were more focused and predictable.

The main lesson from both rounds is that prompt quality affects the scope and consistency of AI-generated code. A vague prompt can be useful for quickly exploring an idea, while a precise prompt is more useful when working inside an existing codebase where consistency and controlled changes are important.