'use strict';

// Functions
function capitaliseFirstLetter(string_base)
{
	var string = string_base.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}