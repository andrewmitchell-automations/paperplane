// SPDX-License-Identifier: AGPL-3.0-only
// See the LICENSE file for details.

// Plane Query Language, syntax only. Field names, operator support, function
// arity, string escapes and duration units are checked by the Python visitor.

grammar PQL;

options {
    caseInsensitive = true;
}

query
    : expression EOF
    ;

expression
    : orExpr
    ;

orExpr
    : andExpr (OR andExpr)*
    ;

andExpr
    : notExpr (AND notExpr)*
    ;

notExpr
    : NOT notExpr
    | primary
    ;

primary
    : LPAREN expression RPAREN
    | predicate
    | customPropertyPredicate
    ;

predicate
    : fieldName comparison
    | conditionFunction
    ;

fieldName
    : IDENT
    ;

customPropertyPredicate
    : CF LBRACKET propertyReference RBRACKET comparison
    ;

propertyReference
    : STRING
    ;

conditionFunction
    : functionName callArguments
    ;

// Function names are identifiers, not reserved words; parser.py checks them.
functionName
    : IDENT
    ;

callArguments
    : LPAREN arguments? RPAREN
    ;

comparison
    : operator value                 # compareOperator
    | IN listOperand                 # inList
    | NOT IN listOperand             # notInList
    | IS NOT? NULL                   # isNull
    ;

// A list function such as openStates() stands for a value list.
listOperand
    : valueList
    | valueFunction
    ;

operator
    : EQ | NEQ | GT | GTE | LT | LTE | TILDE
    ;

valueList
    : LPAREN (value (COMMA value)*)? RPAREN
    ;

arguments
    : value (COMMA value)*
    ;

value
    : STRING                         # stringValue
    | MINUS? NUMBER                  # numberValue
    | IDENT                          # identValue
    | valueFunction durationOffset*  # functionValue
    ;

valueFunction
    : functionName callArguments
    ;

durationOffset
    : sign DURATION
    ;

sign
    : PLUS | MINUS
    ;

AND: 'and';
OR: 'or';
NOT: 'not';
IN: 'in';
IS: 'is';
NULL: 'null';
CF: 'cf';

NEQ: '!=';
GTE: '>=';
LTE: '<=';
EQ: '=';
GT: '>';
LT: '<';
TILDE: '~';
LPAREN: '(';
RPAREN: ')';
LBRACKET: '[';
RBRACKET: ']';
COMMA: ',';
PLUS: '+';
MINUS: '-';

// Any escape is accepted; the visitor reports the offset of a bad one.
STRING
    : '"' ('\\' . | ~["\\])* '"'
    | '\'' ('\\' . | ~['\\])* '\''
    ;

// Any unit is accepted; the visitor reports the offset of a bad one.
DURATION
    : [0-9]+ [a-z]+
    ;

NUMBER
    : [0-9]+ ('.' [0-9]+)?
    ;

IDENT
    : [\p{L}_] [\p{L}\p{N}_]*
    ;

WS
    : [\p{White_Space}]+ -> skip
    ;
