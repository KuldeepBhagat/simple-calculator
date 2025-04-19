export function evaluateExpression(input) {
    const tokens = tokenize(input);
    const ast = parseExpression(tokens);
    return evaluate(ast);
  }
  
  // Step 1: Tokenize input into numbers and operators
  function tokenize(str) {
    const tokens = [];
    let i = 0;
  
    while (i < str.length) {
      const char = str[i];
  
      if (/\s/.test(char)) {
        i++;
        continue;
      }
  
      if (/[0-9.]/.test(char)) {
        let numStr = '';
        while (/[0-9.]/.test(str[i])) {
          numStr += str[i++];
        }
        tokens.push({ type: 'NumberLiteral', value: parseFloat(numStr) });
        continue;
      }
  
      if (/[+\-*/()]/.test(char)) {
        // Handle negative numbers
        if (
          char === '-' &&
          (tokens.length === 0 ||
            tokens[tokens.length - 1].value === '(' ||
            tokens[tokens.length - 1].type === 'Operator')
        ) {
          let numStr = '-';
          i++;
          while (/[0-9.]/.test(str[i])) {
            numStr += str[i++];
          }
          tokens.push({ type: 'NumberLiteral', value: parseFloat(numStr) });
        } else {
          tokens.push({ type: 'Operator', value: char });
          i++;
        }
        continue;
      }
  
      throw new Error(`Unexpected character: ${char}`);
    }
  
    return tokens;
  }
  
  // Step 2: Parse tokens into an AST (with parentheses support)
  function parseExpression(tokens) {
    let current = 0;
  
    function parsePrimary() {
      const token = tokens[current];
  
      if (token && token.value === '(') {
        current++;
        const expr = parseAddSub();
        if (!tokens[current] || tokens[current].value !== ')') {
          throw new Error('Expected closing parenthesis');
        }
        current++; // skip ')'
        return expr;
      }
  
      if (!token || token.type !== 'NumberLiteral') {
        throw new Error('Expected number');
      }
  
      current++;
      return token;
    }
  
    function parseTerm() {
      let node = parsePrimary();
  
      while (
        tokens[current] &&
        (tokens[current].value === '*' || tokens[current].value === '/')
      ) {
        const operator = tokens[current++].value;
        const right = parsePrimary();
        node = { type: 'BinaryExpression', operator, left: node, right };
      }
  
      return node;
    }
  
    function parseAddSub() {
      let node = parseTerm();
  
      while (
        tokens[current] &&
        (tokens[current].value === '+' || tokens[current].value === '-')
      ) {
        const operator = tokens[current++].value;
        const right = parseTerm();
        node = { type: 'BinaryExpression', operator, left: node, right };
      }
  
      return node;
    }
  
    return parseAddSub();
  }
  
  // Step 3: Evaluate the AST
  function evaluate(node) {
    if (node.type === 'NumberLiteral') return node.value;
  
    const left = evaluate(node.left);
    const right = evaluate(node.right);
  
    switch (node.operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
    }
  
    throw new Error(`Unknown operator: ${node.operator}`);
  }