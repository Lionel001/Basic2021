interface Person {
    a: string
    b: string
}

function greeter(person: Person) {
    return person.a + person.b
}

let user = {a: '1', b: '2'}
greeter(user)
