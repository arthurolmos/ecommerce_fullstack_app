

export function translate(string) {

    switch (string) {
        case 'skirts':              return 'saias'
        case 'socks':               return 'meias'
        case 'earrings':            return 'brincos'
        case 'necklaces':           return 'colares'
        case 'carpets':             return 'tapetes'
        
        case 'profile':             return 'perfil'
        case 'user':                return 'usuário'
        case 'addresses':           return 'endereços'
        case 'account':             return 'conta'
        case 'editprofile':         return 'editar perfil'


        default:                return ''
    }
}