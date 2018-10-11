import '../<%= name %>.js';

const basic = fixture`
    <<%= name %>></<%= name %>>
`;

suite('<%= name %>', () => {
    test('instantiating the element with default properties works', () => {
        const element = basic();
        assert.equal(element.prop1, '<%= name %>');
        const elementShadowRoot = element.shadowRoot;
        const elementHeader = elementShadowRoot.querySelector('h2');
        assert.equal(elementHeader.innerHTML, 'Hello <%= name %>!');
    });
});
