def test_flow_acceptance(client):
    pA = {
        'title': 'Handmade Bamboo Basket',
        'category': 'BAMBOO CRAFT',
        'material': 'Bamboo',
        'craft': 'Hand Weaving',
        'description': 'Basket made of bamboo.'
    }
    rA1 = client.post('/api/interview/next', json={
        'productProfile': pA,
        'conversationHistory': [],
        'userAnswer': '',
        'language': 'en'
    })
    dA1 = rA1.json()
    assert dA1['missingRequiredFields'] == ['workDays']
    assert dA1['isComplete'] is False

    rA2 = client.post('/api/interview/next', json={
        'productProfile': pA,
        'conversationHistory': [{'sender': 'ai', 'text': dA1['nextQuestion']}],
        'userAnswer': 'two days',
        'language': 'en'
    })
    dA2 = rA2.json()
    assert dA2['isComplete'] is True
    assert dA2['updatedProduct'].get('workDays') in ('2 days', 'two days')
    assert dA2['nextQuestion'] is None

    pB = {'title': 'Handmade Basket', 'description': 'Basket item'}
    rB = client.post('/api/interview/next', json={
        'productProfile': pB,
        'conversationHistory': [],
        'userAnswer': 'I make this basket from bamboo, I weave it by hand, and it takes two days.',
        'language': 'en'
    })
    dB = rB.json()
    assert dB['updatedProduct'].get('material') == 'Bamboo'
    assert 'weav' in dB['updatedProduct'].get('craft').lower()
    assert 'two' in dB['updatedProduct'].get('workDays').lower() or '2' in dB['updatedProduct'].get('workDays').lower()

    rC = client.post('/api/interview/next', json={
        'productProfile': pA,
        'conversationHistory': [{'sender': 'ai', 'text': 'How long?'}],
        'userAnswer': 'இரண்டு நாட்கள் ஆகும்.',
        'language': 'ta'
    })
    dC = rC.json()
    assert dC['updatedProduct'].get('workDays') != ''

    rD = client.post('/api/catalogue/generate', json={
        'product': dA2['updatedProduct']
    })
    dD = rD.json()
    assert dD['catalogue']['workDays'] in ('2 days', 'two days')
