/**
 * Convert decimal nums to binaris
 */

// decimal input, result and warning elements.
var dec_input = document.getElementById('dec'),
		dec_result = document.getElementsByClassName('result')[0],
    dec_warn = document.getElementsByClassName('warn')[0];

// when you stop typing, the script converts
dec_input.addEventListener('keyup', function() {
  
  // the decimal input value
  var dec = dec_input.value;
  
  // verify the input as a number
  if(isNaN(dec)) return dec_warn.innerHTML = "<span>Use apenas números</span>";
  
  // verify the input as a posetive integer
  if(dec < 0) return dec_warn.innerHTML = "<span>Use apenas números naturais</span>";
  
  dec_warn.innerHTML = "";
  
// Variable where the result will be stored
  var result = [];
  
// Within the `while` block the rest of the decimal divided by 2 will be stored in the `result` array.
/* Every time this is done, the `dec` variable will be redefined for itself divided by 2 rounded down, then in the next loop this is the amount that will be used in the account. We repeat the process until this value is zero, so in the end, We take the results you have acquired and reverse your order.
*/
  while(dec) {
    result.push(dec % 2);
    dec = ~~(dec / 2);
  }

  // set the 'result' to ternary operator: if 'dec' isn't equal to "", then reverse the original 'resu'
  result = dec !== "" ? result.reverse().join('') : "";
  
  // pass the result joined array to decimal result html.
  dec_result.innerHTML = result;
});






/**
 * Convert binary to decimal
 */

// binary input, result and warning elements.
var bin_input = document.getElementById('bin'),
    bin_result = document.getElementsByClassName('result')[1],
    bin_warn = document.getElementsByClassName('warn')[1];

// when you stop typing, the script converts
bin_input.addEventListener('keyup', function() {
  
  // the binary input value
  var bin = bin_input.value;
  
 
  
  // verify the input as a number
  if(isNaN(bin)) return bin_warn.innerHTML = "<span>Use apenas números</span>";
  
  // verify the input as a binary format - only 1s and 0s
  if(/[2-9]/g.test(bin)) return bin_warn.innerHTML = "<span>Use apenas números de base 2</span>";
  
  // verify the input as a positive int
  if(bin < 0) return bin_warn.innerHTML = "<span>Use apenas números naturais binários</span>";
  
  bin_warn.innerHTML = "";
  
// Variable where the result will be stored
  var result = 0;
  
  
  /*
   * the current value multiplied by two plus the next character of the binary
   *
   * The result of this account is taken as the current value,
   * then we do the same process until the last character
   * of the torque and thus we get the result.
   *
   * Exemplifying:
   * Conversion of the `1011001` binary to decimal
   *
   * 1011001 | Starting with the first character from left to right.
   * ^ | In this case it is 1, so we make the following count:
   *
   * (0 * 2) + 1 | Outcome: save
   *
   * In the next character, we will use the result of this account
   * in multiplication.
   *
   * 1011001 | We will now use the next character
   * ^ | the left, which in this case is zero.
   *
   * (1 * 2) + 0 | Outcome: save
   *
   * This process will be repeated until the last character of the torque.
   *
   * 1011001 |
   * ^ | (2 * 2) + 1 | Result: 5
   * --------- |
   * 1011001 |
   * ^ | (5 * 2) + 1 | Outcome:
   * --------- |
   * 1011001 |
   * ^ | (11 * 2) + 0 | Outcome:
   * --------- |
   * 1011001 |
   * ^ | (22 * 2) + 0 | Outcome:
   * --------- |
   * 1011001 |
   * ^ | (44 * 2) + 1 | Outcome:
   * --------- |
   *
   * Thus we conclude that the decimal value of the
   * binary `1011001` is: 89.
   */
  
  for(var i = 0; i < bin.length; i++) {
    result = (result * 2) + parseInt(bin[i]);
  }
  
  result = bin ? result : "";
  
  // pass the result to binary result html.
  bin_result.innerHTML = result;
});