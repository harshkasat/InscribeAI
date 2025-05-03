import re


def _extract_json_from_response(text):
    """Extract JSON content from an LLM response that may include markdown code blocks."""

    # Try to find JSON inside code blocks
    json_pattern = r"```(?:json)?\s*([\s\S]*?)```"
    json_matches = re.findall(json_pattern, text, re.DOTALL)

    if json_matches:
        # Return the first JSON match found
        return json_matches[0].strip()

    # If no code blocks, try to find JSON array directly
    array_pattern = r"\[\s*\{.+\}\s*\]"
    array_matches = re.findall(array_pattern, text, re.DOTALL)

    if array_matches:
        return array_matches[0].strip()

    # If no JSON found, return the original text
    # This will likely cause a JSON parsing error, which is caught in the calling method
    return text
