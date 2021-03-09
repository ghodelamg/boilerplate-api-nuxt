import createRepository from '~/api/repository'
export default (ctx, inject) => {
    // inject the repository in the context (ctx.app.$repository)
    // And in the Vue instances (this.$repository in your components)
    const repositoryWithAxios = createRepository(ctx.$axios)
    inject('apiRepository', repositoryWithAxios())

    // You can reuse the repositoryWithAxios object:
    // inject("userRepository", repositoryWithAxios('/users'));
}
