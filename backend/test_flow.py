import sys
import requests

sys.stdout.reconfigure(encoding='utf-8')

print('=== TEST A: ONLY WORKDAYS MISSING & ANSWERING "two days" ===')
pA = {
    'title': 'Handmade Bamboo Basket',
    'category': 'BAMBOO CRAFT',
    'material': 'Bamboo',
    'craft': 'Hand Weaving',
    'description': 'Basket made of bamboo.'
}
rA1 = requests.post('http://localhost:8000/api/interview/next', json={
    'productProfile': pA,
    'conversationHistory': [],
    'userAnswer': '',
    'language': 'en'
})
dA1 = rA1.json()
print('Initial missing fields:', dA1['missingRequiredFields'])
print('Initial AI Question:', dA1['nextQuestion'])
assert dA1['missingRequiredFields'] == ['workDays']
assert dA1['isComplete'] is False

rA2 = requests.post('http://localhost:8000/api/interview/next', json={
    'productProfile': pA,
    'conversationHistory': [{'sender': 'ai', 'text': dA1['nextQuestion']}],
    'userAnswer': 'two days',
    'language': 'en'
})
dA2 = rA2.json()
print('After answering "two days":')
print('isComplete:', dA2['isComplete'])
print('workDays:', repr(dA2['updatedProduct'].get('workDays')))
print('missingRequiredFields:', dA2['missingRequiredFields'])
print('nextQuestion:', dA2['nextQuestion'])
assert dA2['isComplete'] is True
assert dA2['updatedProduct'].get('workDays') in ('2 days', 'two days')
assert dA2['nextQuestion'] is None

print('\n=== TEST B: MULTIPLE DATA IN ONE ANSWER ===')
pB = {'title': 'Handmade Basket', 'description': 'Basket item'}
rB = requests.post('http://localhost:8000/api/interview/next', json={
    'productProfile': pB,
    'conversationHistory': [],
    'userAnswer': 'I make this basket from bamboo, I weave it by hand, and it takes two days.',
    'language': 'en'
})
dB = rB.json()
print('Extracted material:', repr(dB['updatedProduct'].get('material')))
print('Extracted craft:', repr(dB['updatedProduct'].get('craft')))
print('Extracted workDays:', repr(dB['updatedProduct'].get('workDays')))
assert dB['updatedProduct'].get('material') == 'Bamboo'
assert 'weav' in dB['updatedProduct'].get('craft').lower()
assert 'two' in dB['updatedProduct'].get('workDays').lower() or '2' in dB['updatedProduct'].get('workDays').lower()

print('\n=== TEST C: TAMIL ANSWER ===')
rC = requests.post('http://localhost:8000/api/interview/next', json={
    'productProfile': pA,
    'conversationHistory': [{'sender': 'ai', 'text': 'How long?'}],
    'userAnswer': 'இரண்டு நாட்கள் ஆகும்.',
    'language': 'ta'
})
dC = rC.json()
print('Tamil Extracted workDays:', repr(dC['updatedProduct'].get('workDays')))
assert dC['updatedProduct'].get('workDays') != ''

print('\n=== TEST D: GENERATE CATALOGUE AFTER ANSWER ===')
rD = requests.post('http://localhost:8000/api/catalogue/generate', json={
    'product': dA2['updatedProduct']
})
dD = rD.json()
print('Catalogue Title:', dD['catalogue']['title'])
print('Catalogue workDays:', dD['catalogue']['workDays'])
assert dD['catalogue']['workDays'] in ('2 days', 'two days')

print('\nALL 4 COMPREHENSIVE ACCEPTANCE TESTS PASSED 100%!')
