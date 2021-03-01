// default and not required permissions routes
export const SidebarRoutes: MainRoute[] = [
    {
        label: 'Dashboard',
        icon: 'bar-chart',
        url: ''
    },
];

export const BasicRoutes = {
    signIn: 'entrar',
    signOut: 'sair',
    signUp: 'cadastro',
    pageNotFound: 'pagina-nao-encontrada',   
    forgetPassword: 'esqueci-a-senha'
}

export interface MainRoute {
    label: string;
    icon: string;
    url: string;
  }