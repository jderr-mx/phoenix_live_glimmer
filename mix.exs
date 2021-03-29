defmodule PhoenixLiveGlimmer.MixProject do
  use Mix.Project

  def project do
    [
      app: :phoenix_live_glimmer,
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      package: package(),
      description: description(),
      docs: docs(),
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:ex_doc, "~> 0.21", only: :dev, runtime: false},
      {:phoenix_html, "~> 2.11"},
      {:jason, "~> 1.1"}
    ]
  end

  def description do
    """
    A helper library for easily rendering React components in
    Phoenix LiveView views.
    """
  end

  defp package do
    [
      name: :phoenix_live_react,
      files: ["lib", "priv", "mix.exs", "package.json", "README*", "LICENSE*"],
      maintainers: ["John Derr"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/jderr-mx/phoenix_live_glimmer"}
    ]
  end

  defp docs do
    [
      name: "PhoenixLiveGlimmer",
      source_url: "https://github.com/jderr-mx/phoenix_live_glimmer",
      homepage_url: "https://github.com/jderr-mx/phoenix_live_glimmer",
      main: "readme",
      extras: ["README.md"]
    ]
  end
end
