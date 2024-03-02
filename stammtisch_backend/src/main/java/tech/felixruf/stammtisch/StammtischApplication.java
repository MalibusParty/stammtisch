package tech.felixruf.stammtisch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class StammtischApplication {

	public static void main(String[] args) {
		SpringApplication.run(StammtischApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/auth/register").allowedOrigins("*").allowedMethods("POST");
				registry.addMapping("/api/auth/authenticate").allowedOrigins("*").allowedMethods("POST");

				registry.addMapping("/api/drink/**").allowedOrigins("*").allowedMethods("GET", "POST");
				registry.addMapping("/api/drink/transactions/all").allowedOrigins("*").allowedMethods("GET", "POST");

				registry.addMapping("/api/users").allowedOrigins("*").allowedMethods("GET");

			}
		};
	}
}
